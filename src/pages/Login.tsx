import { useRef, useState } from "react";
import { useMutation } from "@apollo/client";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router";
import { SIGN_IN_ADMIN } from "../api";
import { cn } from "../utils/cn";
import { useAuth } from "../hooks";

export default function Login() {
  const emailRef: React.Ref<HTMLInputElement> | undefined = useRef(null);
  const passwordRef: React.Ref<HTMLInputElement> | undefined = useRef(null);

  const navigate = useNavigate();

  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);

  const [loginApi, { loading, error }] = useMutation(SIGN_IN_ADMIN);

  const { login } = useAuth();

  const resetErrors = () => {
    setEmailError(false);
    setPasswordError(false);
  };

  const handleLogin = () => {
    resetErrors();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email && !password) {
      setEmailError(true);
      setPasswordError(true);
    }

    if (!email) {
      setEmailError(true);
      return;
    }

    if (!password) {
      setPasswordError(true);
      return;
    }

    loginApi({ variables: { email, password } })
      .then(({ data }) => {
        const token = data.signInAdministrator.token;
        login(token);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="max-w-full min-h-[100vh] lg:w-[100vw] lg:h-[100vh] bg-white lg:bg-gray-100 lg:grid lg:place-items-center relative">
      <div className="w-[90%] lg:w-[35%] xl:w-[30%] mx-auto lg:bg-white relative top-[10vh] lg:top-0 lg:grid lg:place-items-center lg:rounded-lg lg:shadow">
        <div className="p-6 lg:w-[80%] xl:w-[85%] lg:py-10">
          <div className="max-w-20 max-h-20 mb-4 lg:mb-6 mx-auto">
            <img
              src="/coe-logo.jpg"
              alt="College of engineering exams office logo"
            />
          </div>

          <div className="text-center mb-4 lg:mb-8">
            <h2 className="text-2xl font-medium mb-4">Welcome to ExamFlow</h2>
            <p className="">Seamlessly Managing Your Examinations.</p>
          </div>

          <form
            className="flex flex-col gap-4 lg:gap-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            {error && (
              <div>
                <p className="text-sm text-red-600 text-medium text-center">
                  {error.message}
                </p>
              </div>
            )}
            <div>
              <label
                htmlFor="email"
                className={cn(
                  "block text-sm mb-1 font-medium",
                  emailError && "text-red-600"
                )}
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email address"
                className={cn(
                  "border rounded-md outline-0 w-full p-2 text-sm transition-200",
                  !emailError ? "border-gray-300" : "border-red-500 border-2"
                )}
                ref={emailRef}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className={cn(
                  "block text-sm mb-1 font-medium",
                  passwordError && "text-red-600"
                )}
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className={cn(
                  "border rounded-md outline-0 w-full p-2 text-sm transition-200",
                  !passwordError ? "border-gray-300" : "border-red-500 border-2"
                )}
                ref={passwordRef}
              />
            </div>

            <div>
              <button className="w-full" type="submit">
                <div className="border border-amber-500 w-full rounded-md py-2 text-sm font-semibold bg-amber-500 text-white hover:cursor-pointer hover:opacity-80 duration-200">
                  {loading ? (
                    <ClipLoader size={16} color="white" />
                  ) : (
                    <p>Submit</p>
                  )}
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
