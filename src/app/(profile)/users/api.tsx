import axios from "axios";

export type ApiError = {
    message: string;
    status: number;
    errorCode: string;
};

export type UserResponse = {
    id: number;
    username: string;
    name: string;
    email: string;
    role: string;
    image?: string;
};

export const getRandomUser = async (): Promise<UserResponse> => {
    console.log("Call getRandomUser to get random user");
    await new Promise((resolve) => setTimeout(resolve, 4000));
    const response = await axios.get("https://jsonplaceholder.typicode.com/todos/1");
    // if (response.status !== 200) {
    //     return {
    //         message: "Something went wrong",
    //         status: response.status,
    //         errorCode: response.status.toString(),
    //     };
    // }
    return response.data as UserResponse;
};

export const getUsers = async (): Promise<UserResponse[]> => {
    console.log("Call getRandomUser to get random user");
    // await new Promise((resolve) => setTimeout(resolve, 4000));
    return [] as UserResponse[];
};

export const getUserById = async (id: number): Promise<UserResponse> => {
    const users = await getUsers();
    const result: UserResponse[] = users.filter((user) => user.id == id);
    if (result.length > 0) {
        return result[0];
    }
    throw new Error("User not found");
};
