import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import logo from "@/assets/logo.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", { username, rememberMe });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-4xl flex flex-col md:flex-row rounded-xl overflow-hidden shadow-2xl">
        {/* Image Section */}
        <div className="md:w-1/2">
          <img
            src={logo}
            alt="Modern architecture"
            className="w-full h-48 md:h-full object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="md:w-1/2 bg-muted p-6 md:p-8 flex flex-col justify-center">
          <CardHeader className="text-center p-0 mb-6">
            <CardTitle className="text-2xl md:text-3xl font-bold text-foreground">
              Log in
            </CardTitle>
          </CardHeader>

          <Card className="border-0 shadow-none bg-transparent">
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4 p-0">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-foreground">
                    Username <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-card border-border"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-foreground">
                    Password <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-card border-border"
                    required
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <Label 
                    htmlFor="remember" 
                    className="text-sm font-normal text-foreground cursor-pointer"
                  >
                    Remember me
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Login
                </Button>
              </CardContent>

              <CardFooter className="flex flex-col gap-2 p-0 mt-6">
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Forgot password?
                </Link>
                <Link 
                  to="/register" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Don't have an account?
                </Link>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
