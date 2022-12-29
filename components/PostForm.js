import { useState, useEffect } from "react";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import db from "../net/db";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../net/auth";

export default function PostForm({ initialValues, children, mode }) {
	const [subject, setSubject] = useState(initialValues?.subject);
	const [content, setContent] = useState(initialValues?.content);
	const [user, setUser] = useState();
	const router = useRouter();
	const submit = async () => {
		user.BaseLayout;
		await addDoc(collection(db, "posts"), {
			subject,
			content,
			author: user.email,
			create_at: new Date().getTime(),
		});
		alert("저장 되었습니다.");
		setSubject("");
		setContent("");
		router.push("/");
		// history.back();
	};

	const update = async () => {
		await updateDoc(doc(db, "posts", router.query.id), {
			subject,
			content,
		});
		alert("저장 되었습니다.");
		router.push("/");
	};

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			setUser(user);
		});
	}, []);

	return (
		<div className="container mx-auto px-4 w-6/12">
			{children}

			<form
				onSubmit={(event) => {
					event.preventDefault();
					return false;
				}}
			>
				<div className="mb-4">
					<input
						className="border border-solid border-gray-200 w-full"
						type="text"
						placeholder="제목을 입력해주세요."
						value={subject}
						onChange={(event) => setSubject(event.target.value)}
					/>
				</div>
				<div className="mb-4">
					<textarea
						className="border border-solid border-gray-200 w-full h-96 resize-none"
						placeholder="내용을 입력해주세요."
						value={content}
						onChange={(event) => setContent(event.target.value)}
					></textarea>
				</div>
				<div>
					<button
						className="border border-gray-200 p-2 w-full"
						onClick={mode === "update" ? update : submit}
					>
						전송
					</button>
				</div>
			</form>
		</div>
	);
}
