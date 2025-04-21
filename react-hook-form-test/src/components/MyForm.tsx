import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";

type FormValues = {
  username: string;
  email: string;
  password: string;
};

export const EasyForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log("Form Submitted.", data);
  };

  return (
    <div className="w-full p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-1/3">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            {...register("username", { required: "Username is required." })}
          />
          <p>{errors.username?.message}</p>
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Email is invalid.",
              },
              validate: {
                noAdmin: (fieldValue) => {
                  return (
                    fieldValue !== "admin@gmail.com" ||
                    "You can not use admin@gmail.com!"
                  );
                },
                noBlackList: (fieldValue) => {
                  return (
                    !fieldValue.endsWith("daum.net") ||
                    "This domain is not supported."
                  );
                },
              },
            })}
          />
          <p>{errors.email?.message}</p>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            {...register("password", {
              required: "Password is required.",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters.",
              },
            })}
          />
          <p>{errors.password?.message}</p>
          <button>Submit</button>
        </div>
      </form>
      <DevTool control={control} />
    </div>
  );
};
