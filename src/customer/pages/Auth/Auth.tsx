import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const Auth = () => {
  const [haveAccount, setHaveAccount] = useState(true);

  return (
    <div className="flex justify-center h-full items-center my-5">
      <div className="max-w-md h-full rounded-md shadow-lg mx-5">
        <img
          className="w-full object-cover rounded-t-md"
          src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />

        <div className="mt-10 mx-5">
          {haveAccount ? <LoginForm /> : <RegisterForm />}

          <div className="flex items-center gap-1 justify-center">
            {haveAccount ? (
              <span>
                Don't have an account?{" "}
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => setHaveAccount(false)}
                >
                  Register here
                </button>
              </span>
            ) : (
              <span>
                Already have an account?{" "}
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => setHaveAccount(true)}
                >
                  Login here
                </button>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
