import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";

let renderCount = 0;

type FormValues = {
  username: string;
  age: number;
  dob: Date;
};

// touchedFields, dirtyFields, isDirty 알아보기
// Touched(접촉됨)
// 의미 : 사용자가 폼 필드에 상호작용 했음을 나타냄
// 발생조건 : 사용자가 필드에 포커스를 주었다가 포커스를 잃을 때(onBlur 이벤트 발생 시)
// 관련속성
// - touchedFields : 사용자가 상호작용 한 필드들의 객체
// - isTouched : 특정 필드가 상호작용되었는지 여부
// formState.touchedFields : 모든 터치된 필드의 상태를 포함하는 객체
// 한번 touched 상태가 되면 폼을 리셋하거나 프로그래밍 방식으로 변경하지 않는 한 계속 touched 상태

// Dirty(변경됨)
// 의미 : 필드의 현재 값이 초기값과 다름을 나타냄
// 발생조건 : 사용자가 필드의 값을 변경하여 초기값과 달라졌을 때
// 관련속성
// - dirtyFields : 초기값과 달라진 필드들의 객체
// - isDirty : 폼 전체에서 하나 이상의 필드가 변경되었는지 여부
// - formState.dirtyFields : 모든 변경된 필드의 상태를 포함하는 객체
// 필드 값을 다시 초기값과 동일하기 되돌리면 다시 false

export const FormValues6 = () => {
  const {
    register,
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, touchedFields, dirtyFields, isDirty },
  } = useForm<FormValues>({
    defaultValues: {
      username: "Jun",
      age: 0,
      dob: new Date(),
    },
  });

  console.log({ touchedFields, dirtyFields, isDirty });

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
