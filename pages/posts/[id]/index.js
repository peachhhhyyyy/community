import BaseLayout from "../../../components/BaseLayout";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import db from "../../../net/db";
import { doc, getDoc, deleteDoc } from "firebase/firestore";

export default function Posts() {
	const router = useRouter();
	const [subject, setSubject] = useState("");
	const [content, setContent] = useState("");

	useEffect(() => {
		getDoc(doc(db, "posts", router.query.id)).then((doc) => {
			const data = doc.data();
			setSubject(data.subject);
			setContent(data.content);
		});
	}, []);

	const remove = async () => {
		await deleteDoc(doc(db, "posts", router.query.id));
		alert("삭제 되었습니다.");
		router.push("/");
	};

	return (
		<BaseLayout>
			<div className="container mx-auto px-4 w-full">
				<h1 className="text-2xl font-bold my-2 pb-2 border-b">
					{subject}
				</h1>
				<p classnName="p-4">{content}</p>

				<div className="mt-8 w-full flex justify-end">
					<Link href={`/posts/${router.query.id}/edit`}>
						<button className="p-2 bg-black text-white mr-2">
							수정
						</button>
					</Link>
					<button
						className="p-2 bg-black text-white"
						onClick={remove}
					>
						삭제
					</button>
				</div>
			</div>
		</BaseLayout>
	);
}
