import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

let renderCount = 0;

const schema = z.object({
  username: z.string().nonempty("username is required"),
  email: z.string().nonempty("email is required").email("email is not valid"),
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
    resolver: zodResolver(schema),
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
