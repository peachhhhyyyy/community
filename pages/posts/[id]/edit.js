import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BaseLayout from "../../../components/BaseLayout";
import PostForm from "../../../components/PostForm";
import db from "../../../net/db";
import { doc, getDoc } from "firebase/firestore";

export default function Edit() {
	const [initialValues, setInitialValues] = useState();
	const router = useRouter();

	useEffect(() => {
		getDoc(doc(db, "posts", router.query.id)).then((doc) => {
			const data = doc.data();
			setInitialValues(data);
		});
	}, []);

	return (
		<BaseLayout>
			{initialValues && (
				<PostForm mode={"update"} initialValues={initialValues}>
					<h1 className="text-2xl font-bold my-4">게시물 수정</h1>
				</PostForm>
			)}
		</BaseLayout>
	);
}
