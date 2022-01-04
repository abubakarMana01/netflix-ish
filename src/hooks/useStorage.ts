import { useEffect, useState } from "react";
import { storage } from "../config/firebase";

export default function useStorage(file: any) {
	const [url, setUrl] = useState(null);
	const [percentage, setPercentage] = useState(0);
	const [error, setError] = useState(null);

	useEffect(() => {
		const storageRef = storage.ref(file?.name);
		storageRef.put(file).on(
			"state_changed",
			snap => {
				let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
				setPercentage(percentage);
			},
			err => {
				console.log(err.message);
				setError(error);
			},
			async () => {
				const url = await storageRef.getDownloadURL();
				setUrl(url);
			}
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [file]);

	return { percentage, url, error };
}
