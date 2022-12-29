import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../net/auth";
import BaseLayout from "../components/BaseLayout";
import { useRouter } from "next/router";

export default function SignIn() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();
	const submit = () => {
		console.log({ email, password });
		signInWithEmailAndPassword(auth, email, password)
			.then((res) => {
				console.log(res);
				router.push("/");
			})
			.catch((error) => {
				console.warn(error);
			});
	};

	return (
		<BaseLayout>
			<div className="container mx-auto px-4 w-6/12">
				<h1 className="text-2xl font-bold my-2">로그인</h1>
				<div>
					<input
						type="email"
						value={email}
						onChange={(event) => setEmail(event.target.value)}
						className="border border-solid border-gray-200 w-full"
					/>
				</div>
				<div className="my-2">
					<input
						type="password"
						value={password}
						onChange={(event) => setPassword(event.target.value)}
						className="border border-solid border-gray-200 w-full"
					/>
				</div>
				<div>
					<button
						className="border border-gray-200 p-2 w-full"
						onClick={submit}
					>
						로그인
					</button>
				</div>
			</div>
		</BaseLayout>
	);
}
