import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";

let renderCount = 0;

type FormValues = {
  username: string;
  age: number;
  dob: Date;
};

// getValues, setValue 함수로 자바스크립트에서 FormValues 직접 제어하기
export const FormValues5 = () => {
  const {
    register,
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      username: "Jun",
      age: 0,
      dob: new Date(),
    },
  });

  const handleGetValues = () => {
    console.log("Values", getValues());
  };

  const handleSetValue = () => {
    setValue("username", "", {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

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
          <button type="button" onClick={handleGetValues}>
            getValues
          </button>
          <button type="button" onClick={handleSetValue}>
            setValue
          </button>
        </div>
      </form>
      <DevTool control={control} />
    </div>
  );
};
