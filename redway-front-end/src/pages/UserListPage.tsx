import { useEffect, useState } from "react";
import "../styles/global.css";
import axios from "axios";
import { Link } from "react-router-dom";

const URL = "http://localhost:8080";

interface User {
  name: string,
  email: string
}

const UserListPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios
      .get<User[]>(URL + "/user")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Erro ao obter usuários:", error);
      });
  }, []);

  return (
    <main className="h-screen pt-6 bg-zinc-60 item-center justify-center p-10">
      <div className="bg-white pt-6 shadow rounded-md">
        <div className="px-4 flex pb-2">
          <h2 className="text-lg leading-6 font-medium text-gray-900 text-center">
            Lista de Usuários
          </h2>

          <Link
            to="/"
            className="bg-black rounded font-semibold text-white ml-auto p-2"
          >
            <button type="button" className="btn btn-md">
              Criar usuário
            </button>
          </Link>
        </div>
      </div>

      <div className="mt-6">
        <table className="w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Nome
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Email
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr>
                <td className="px-6 py-4 test-sm font-medium text-gray-900 whitespace-nowrap">
                  {user.name}
                </td>
                <td className="px-6 py-4 test-sm font-medium text-gray-900 whitespace-nowrap">
                  {user.email}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default UserListPage;
