import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";

type FormValues = {
  username: string;
  age: number;
  dob: Date;
};

// FormValues 항목에서 문자열이 아닌 number 타입이나 date 타입 사용하기
// input type="number"와 input type="date"의 값은 기본적으로 문자열(string)로 반환된다.
// valueAsNumber나 valueAsDate 옵션을 사용해야 한다.
export const FormValues4 = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      username: "Jun",
      age: 0,
      dob: new Date(),
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

          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            {...register("age", {
              valueAsNumber: true,
              required: "Age is required.",
            })}
          />

          <label htmlFor="dob">Date of birth</label>
          <input
            type="date"
            id="dob"
            {...register("dob", {
              valueAsDate: true,
              required: "Date of birth is required.",
            })}
          />

          <button>Submit</button>
        </div>
      </form>
      <DevTool control={control} />
    </div>
  );
};
