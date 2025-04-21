import { DevTool } from "@hookform/devtools";
import { useFieldArray, useForm } from "react-hook-form";

type FormValues = {
  username: string;
  email: string;
  social: {
    github: string;
    twitter: string;
  };
  phoneNumbers: string[];
  phNumbers: {
    number: string;
  }[];
};

// useFieldArray 함수로 FormValues 항목 늘이고 줄이기
export const FormValues3 = () => {
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
      phoneNumbers: ["", ""],
      phNumbers: [{ number: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control: control,
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
          <label htmlFor="wired">Wired phone</label>
          <input type="text" id="wired" {...register("phoneNumbers.0")} />

          <label htmlFor="Wireless">Wireless</label>
          <input type="text" id="Wireless" {...register("phoneNumbers.1")} />

          <div>
            <label>List of Phone Numbers</label>
            <div>
              {fields.map((field, index) => {
                return (
                  <div key={field.id}>
                    <input
                      type="text"
                      {...register(`phNumbers.${index}.number`)}
                    />
                    {index > 0 && (
                      <button type="button" onClick={() => remove(index)}>
                        Remove
                      </button>
                    )}
                  </div>
                );
              })}
              <button type="button" onClick={() => append({ number: "" })}>
                Add phone Number
              </button>
            </div>
          </div>

          <button>Submit</button>
        </div>
      </form>
      <DevTool control={control} />
    </div>
  );
};
