import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

let renderCount = 0;

const schema = yup.object({
  username: yup.string().required("username is required"),
  email: yup.string().email("email is not valid").required("email is required"),
});

type FormValues = {
  username: string;
  email: string;
};

export const YupForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      username: "",
      email: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormValues) => {
    reset();
    console.log("Form submitted.", data);
  };

  renderCount++;

  return (
    <div className="w-full p-4">
      <h1 className="text-2xl mb-5">Render count : {renderCount / 2}</h1>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="w-1/3">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" {...register("username")} />
          <p>{errors.username?.message}</p>
          <label htmlFor="email">E-mail</label>
          <input type="text" id="email" {...register("email")} />
          <p>{errors.email?.message}</p>

          <button>Submit</button>
        </div>
      </form>
    </div>
  );
};
