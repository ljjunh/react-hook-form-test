import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";

type FormValues = {
  username: string;
  email: string;
};

// Validation 모드
// all: 모든 입력에 즉시 유효성 검사를 실행함
// onBlur: 필드에서 포커스가 빠져나갈 때만 유효성 검사를 실행함
// onChange: 필드 값이 변경될 때마다 유효성 검사를 실행함
// onSubmit: 폼이 제출될 때만 유효성 검사를 실행함
// onTouched: 필드가 터치된 후부터 변경사항에 대해 유효성 검사를 실행함
export const Validation2 = () => {
  const {
    register,
    control,
    handleSubmit,
    trigger,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      username: "Jun",
      email: "",
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
                emailCheck: async (fieldValue) => {
                  const response = await fetch(
                    `https://jsonplaceholder.typicode.com/users?email=${fieldValue}`
                  );
                  const data = await response.json();
                  return data.length == 0 || "Email already exists";
                },
              },
            })}
          />
          <p>{errors.email?.message}</p>
          <button type="button" onClick={() => trigger("email")}>
            Validate
          </button>
          <button disabled={!isDirty || isSubmitting}>Submit</button>
        </div>
      </form>
      <DevTool control={control} />
    </div>
  );
};
