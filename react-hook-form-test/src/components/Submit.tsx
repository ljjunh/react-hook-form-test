import { DevTool } from "@hookform/devtools";
import { FieldErrors, useForm } from "react-hook-form";

let renderCount = 0;

type FormValues = {
  username: string;
  age: number;
  dob: Date;
};

// React-Hook-Form의 formState에는 폼 Submission 상태 값이 4개가 있다
// - isSubmitting : 폼이 현재 제출 진쟁 중일 때 true
// - isSubmitted : 제출 시도가 한 번이라도 있었을 때 true(성공/실패 무관)
// - isSubmitSuccessful : 제출 함수가 오류 없이 실행되었을 때 true
// - submitCount : 총 제출 시도 횟수(성공/실패 무관)
export const Submit = () => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      username: "Jun",
      age: 0,
      dob: new Date(),
    },
  });

  const onError = (errors: FieldErrors<FormValues>) => {
    console.log("Form errors", errors);
  };

  const onSubmit = (data: FormValues) => {
    reset();
    console.log("Form Submitted.", data);
  };

  renderCount++;
  return (
    <div className="w-full p-4">
      <h1 className="mb-5 text-2xl">Render count : {renderCount / 2}</h1>

      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
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

          <button disabled={!isDirty || !isValid || isSubmitting}>
            Submit
          </button>
          <button type="button" onClick={() => reset()}>
            Clear
          </button>
        </div>
      </form>
      <DevTool control={control} />
    </div>
  );
};
