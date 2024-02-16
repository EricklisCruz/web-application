import { useForm } from "react-hook-form";
import "../styles/global.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Link } from "react-router-dom";

const URL = "http://localhost:8080";

const createUserFormSchema = z.object({
  name: z
    .string()
    .min(1, "O nome não foi preenchido")
    .transform((name) => {
      return name
        .trim()
        .split(" ")
        .map((word) => {
          return word[0]
            .toLocaleUpperCase()
            .concat(word.substring(1).toLocaleLowerCase());
        })
        .join(" ");
    }),
  email: z
    .string()
    .min(1, "O email é obrigatório")
    .email("Formato de email inválido"),
});

type CreateUserFormData = z.infer<typeof createUserFormSchema>;

const App = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  });

  async function createUser(data: CreateUserFormData) {
    try {
      const response = await axios.post(URL + "/user", data);
      if(response.status === 201) {
        alert("Usuário cadastrado com sucesso");
      }
    } catch (error) {
      alert("Email já cadastrado");
    }
  }

  return (
    <main className="h-screen bg-zinc-50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit(createUser)}
        className="flex flex-col gap-4 w-full max-w-xs"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            className=" border border-zinc-200 shadow-sn rounded h-10 px-3"
            {...register("name")}
          />

          {errors.name && (
            <span className="text-red-500 text-css">{errors.name.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            className=" border border-zinc-200 shadow-sn rounded h-10 px-3"
            {...register("email")}
          />
          {errors.email && (
            <span className="text-red-500 text-css">
              {errors.email.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="bg-emerald-500 rounded font-semibold text-white h-10 hover:bg-emerald-600"
        >
          Salvar
        </button>

        <Link
          to="/user-list"
          className="bg-black rounded font-semibold text-white h-10 flex items-center justify-center"
        >
          <button type="button">Listar e-mails</button>
        </Link>
      </form>
    </main>
  );
};

export default App;
