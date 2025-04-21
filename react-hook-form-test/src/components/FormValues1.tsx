import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";

type FormValues = {
  username: string;
  email: string;
  social: {
    github: string;
    twitter: string;
  };
  password: string;
};

// FormValues 항목에 중첩된 객체가 있는 경우
export const FormValues1 = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      username: "Jun",
      email: "",
      social: {
        github: "",
        twitter: "",
      },
    },
  });

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
          <label htmlFor="github">Github</label>
          <input
            type="text"
            id="github"
            {...register("social.github", {
              required: "Github account is required!",
            })}
          />
          <p>{errors.social?.github?.message}</p>
          <label htmlFor="twitter">Twitter</label>
          <input
            type="text"
            id="twitter"
            {...register("social.twitter", {
              required: "Twitter account is required!",
            })}
          />
          <p>{errors.social?.message}</p>
          <button>Submit</button>
        </div>
      </form>
      <DevTool control={control} />
    </div>
  );
};
