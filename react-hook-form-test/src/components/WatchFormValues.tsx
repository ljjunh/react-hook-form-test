import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

let renderCount = 0;

type FormValues = {
  username: string;
  age: number;
  dob: Date;
};

// watch로 리렌더링 없이 실시간 FormValues 감시하기
export const WatchFormValues = () => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      username: "Jun",
      age: 0,
      dob: new Date(),
    },
  });

  useEffect(() => {
    const subscription = watch((value) => {
      console.log(value);
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = (data: FormValues) => {
    console.log("Form Submitted.", data);
  };

  renderCount++;
  return (
    <div className="w-full p-4">
      <h1 className="mb-5 text-2xl">Render count : {renderCount / 2}</h1>

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
