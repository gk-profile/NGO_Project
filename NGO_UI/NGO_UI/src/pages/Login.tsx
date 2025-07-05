import { AppWindowIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

import { FormProvider, useForm } from 'react-hook-form'
import { loginFormSchema, registerFormSchema, type LoginFormType, type RegisterFormType } from "@/form/loginForm"
import { zodResolver } from "@hookform/resolvers/zod"
import InputFormField from "@/formFields/InputFormField"

export function Login() {
    const loginForm = useForm({
        resolver: zodResolver(loginFormSchema)
    })

    const registerForm = useForm({
        resolver: zodResolver(registerFormSchema)
    })

    const { handleSubmit} = loginForm
    const { handleSubmit: handleRegisterSubmit } = registerForm


    function onLoginSubmit(data: LoginFormType) {
        console.log("Login submitted", data)
    }

    function onRegisterSubmit(data: RegisterFormType) {
        console.log("Register submitted", data)
    }

    return (
        <div className="w-full min-h-screen items-center justify-center flex flex-col gap-8 p-4">
            <div className="flex items-center justify-center gap-2">
                <AppWindowIcon className="w-6 h-6" />
                <h4 className="font-bold">NGO MANAGEMENT</h4>
            </div>
            <div className="flex overflow-y-auto w-full max-w-sm flex-col gap-6 ">
                <Tabs defaultValue="login">
                    <TabsList className="w-full">
                        <TabsTrigger value="login">Login</TabsTrigger>
                        <TabsTrigger value="register">Register</TabsTrigger>
                    </TabsList>
                    <FormProvider {...loginForm}>
                        <form onSubmit={handleSubmit(onLoginSubmit)}>
                            <TabsContent value="login">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Login</CardTitle>
                                        <CardDescription>
                                            Enter your credentials to log in.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="gap-3">

                                        <InputFormField
                                            label="Username"
                                            placeholder="Enter your username"
                                            name="username"
                                            required
                                        />
                                        <InputFormField
                                            label="Password"
                                            placeholder="Enter your password"
                                            name="password"
                                            type="password"
                                            required
                                        />

                                    </CardContent>
                                    <CardFooter>
                                        <Button type="submit">Login</Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>
                        </form>
                    </FormProvider>

                    <FormProvider {...registerForm}>
                        <form onSubmit={handleRegisterSubmit(onRegisterSubmit)}>
                            <TabsContent value="register">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Register</CardTitle>
                                        <CardDescription>
                                            Create a new account by filling out the information below.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="grid gap-6">
                                        <InputFormField
                                            label="Username"
                                            placeholder="Enter your username"
                                            name="username"
                                            required
                                        />
                                        <InputFormField
                                            label="Email"
                                            placeholder="Enter your email"
                                            name="email"
                                            type="email"
                                            required
                                        />
                                        <InputFormField
                                            label="Mobile Number"
                                            placeholder="Enter your mobile number"
                                            name="contactNumber"
                                            type="tel"
                                            required
                                        />

                                        <InputFormField
                                            label="Password"
                                            placeholder="Enter your password"
                                            name="password"
                                            type="password"
                                            required
                                        />
                                    </CardContent>
                                    <CardFooter>
                                        <Button>Register</Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>
                        </form>
                    </FormProvider>
                </Tabs>
            </div>
        </div>
    )
}

