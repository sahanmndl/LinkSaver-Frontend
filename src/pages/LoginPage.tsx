import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {loginUser} from "../api/user.ts";
import {setAuthData} from "../utils/auth.ts";
import {Button} from "@/components/ui/button.tsx";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Eye, EyeOff} from "lucide-react";
import {Alert, AlertDescription} from "@/components/ui/alert.tsx";

interface LoginFormData {
    email: string;
    password: string;
}

const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const {control, handleSubmit, formState: {errors}} = useForm<LoginFormData>({
        resolver: yupResolver(schema),
    });
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (data: LoginFormData) => {
        try {
            setError('');
            setLoading(true);
            const response = await loginUser(data.email.trim(), data.password.trim());
            setAuthData(response.user, response.token);
            navigate('/home', {replace: true});
        } catch (error) {
            console.error('Login failed:', error.response.data);
            setError(error.response.data.error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Welcome back!</CardTitle>
                    <CardDescription>Enter your credentials to access your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Controller
                                name="email"
                                control={control}
                                defaultValue=""
                                render={({field}) => (
                                    <Input
                                        {...field}
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        className={errors.email ? "border-red-500" : ""}
                                    />
                                )}
                            />
                            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Controller
                                    name="password"
                                    control={control}
                                    defaultValue=""
                                    render={({field}) => (
                                        <Input
                                            {...field}
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Enter your password"
                                            className={errors.password ? "border-red-500 pr-10" : "pr-10"}
                                        />
                                    )}
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4 text-gray-500"/>
                                    ) : (
                                        <Eye className="h-4 w-4 text-gray-500"/>
                                    )}
                                </Button>
                            </div>
                            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                        </div>
                        {error && (
                            <Alert variant="destructive">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                                strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor"
                                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Logging in...
                                </>
                            ) : (
                                'Login'
                            )}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <p className="text-sm text-gray-500">
                        Don't have an account?{' '}
                        <a href="/register" className="text-blue-500 hover:underline">
                            Sign up
                        </a>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
};

export default LoginPage;