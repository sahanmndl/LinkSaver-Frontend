import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {setAuthData} from '../utils/auth';
import {registerUser} from "../api/user.ts";
import {Eye, EyeOff} from 'lucide-react'
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Alert, AlertDescription} from "@/components/ui/alert"
import {Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter} from "@/components/ui/card"

interface RegisterFormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const {control, handleSubmit, formState: {errors}} = useForm<RegisterFormData>({
        resolver: yupResolver(schema),
    });
    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)

    const onSubmit = async (data: RegisterFormData) => {
        try {
            setError('')
            setLoading(true)
            const response = await registerUser(data.name.trim(), data.email.trim(), data.password.trim())
            setAuthData(response.user, response.token)
            navigate('/', {replace: true})
        } catch (error) {
            console.error('Registration failed:', error)
            setError(error.message || 'An unexpected error occurred')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Create an account</CardTitle>
                    <CardDescription>Enter your details to register for LinkSaver</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Controller
                                name="name"
                                control={control}
                                defaultValue=""
                                render={({field}) => (
                                    <Input
                                        {...field}
                                        id="name"
                                        placeholder="Enter your name"
                                        className={errors.name ? "border-red-500" : ""}
                                    />
                                )}
                            />
                            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                        </div>
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
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <div className="relative">
                                <Controller
                                    name="confirmPassword"
                                    control={control}
                                    defaultValue=""
                                    render={({field}) => (
                                        <Input
                                            {...field}
                                            id="confirmPassword"
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            placeholder="Confirm your password"
                                            className={errors.confirmPassword ? "border-red-500 pr-10" : "pr-10"}
                                        />
                                    )}
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="h-4 w-4 text-gray-500"/>
                                    ) : (
                                        <Eye className="h-4 w-4 text-gray-500"/>
                                    )}
                                </Button>
                            </div>
                            {errors.confirmPassword &&
                                <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>}
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
                                    Registering...
                                </>
                            ) : (
                                'Register'
                            )}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <p className="text-sm text-gray-500">
                        Already have an account?{' '}
                        <a href="/login" className="text-blue-500 hover:underline">
                            Log in
                        </a>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
};

export default RegisterPage;