export default function Login() {
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

          <div className="text-center mb-6 lg:mb-8">
            <h2 className="text-2xl font-medium mb-4">Welcome to ExamFlow</h2>
            <p className="">Seamlessly Managing Your Examinations.</p>
          </div>

          <form action="#" className="flex flex-col gap-4 lg:gap-6">
            <div>
              <label htmlFor="email" className="block text-sm mb-1 font-medium">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email address"
                className="border border-gray-300 rounded-md outline-0 w-full p-2 text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm mb-1 font-medium"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="border border-gray-300 rounded-md outline-0 w-full p-2 text-sm"
              />
            </div>

            <div>
              <button className="w-full">
                <div className="border border-amber-500 w-full rounded-md py-2 text-sm font-semibold bg-amber-500 text-white hover:cursor-pointer hover:opacity-80 duration-200">
                  <p>Submit</p>
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
