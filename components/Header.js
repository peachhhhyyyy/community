import { onAuthStateChanged, signOut } from "firebase/auth";
import auth from "../net/auth";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Header() {
	const [user, setUser] = useState(null);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			setUser(user);
			console.log(user); // user data 이거나 null 로 넘어옴
		});
	}, []);

	return (
		<header className="flex justify-end border border-solid mb-4 p-2">
			{user && <button onClick={() => signOut(auth)}>로그아웃</button>}
			{!user && (
				<div>
					<Link href="/sign-in" className="mr-2">
						<button>로그인</button>
					</Link>
					<Link href="/sign-up">
						<button>회원가입</button>
					</Link>
				</div>
			)}
		</header>
	);
}
