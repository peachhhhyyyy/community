import BaseLayout from "../components/BaseLayout";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../net/auth";
import { useState } from "react";
import { useRouter } from "next/router";

export default function SignUp() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();

	const submit = () => {
		createUserWithEmailAndPassword(auth, email, password)
			.then(() => router.push("/"))
			.catch(() => alert("회원가입에 실패했습니다."));
	};

	return (
		<BaseLayout>
			<div className="container mx-auto px-4 w-6/12">
				<h1 className="text-2xl font-bold my-2">회원가입</h1>
				<div>
					<input
						type="email"
						placeholder="이메일"
						value={email}
						onChange={(event) => setEmail(event.target.value)}
						className="border border-solid border-gray-200 w-full"
					/>
				</div>
				<div className="my-2">
					<input
						type="password"
						placeholder="비밀번호"
						value={password}
						onChange={(event) => setPassword(event.target.value)}
						className="border border-solid border-gray-200 w-full"
					/>
				</div>
				<button
					className="border border-gray-200 p-2 w-full"
					onClick={submit}
				>
					회원가입
				</button>
			</div>
		</BaseLayout>
	);
}
