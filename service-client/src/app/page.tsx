"use client";

import { PlaceGroundComponents } from "@/components/PlaceGround";
import aframeRegister from "@/lib/aframeRegister";
import onXrLoaded from "@/lib/onXrLoaded";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import sceneHtml from "./placeground-scene.html";

export default function Home() {
	const [appRendered, setAppRendered] = useState(false);
	const DISABLE_IMAGE_TARGETS = [];
	const [registeredComponents, setRegisterdComponents] = useState(
		new Set<string>(),
	);

	const onloaded = () => onXrLoaded({ xrCtrlConfigure: DISABLE_IMAGE_TARGETS });

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (typeof window === "undefined") return;
		setAppRendered(true);
		aframeRegister({
			entities: [PlaceGroundComponents],
			registered: registeredComponents,
			setter: setRegisterdComponents,
		});

		window.XR8 ? onloaded() : window.addEventListener("xrloaded", onloaded);
	}, [appRendered]);

	return (
		<>
			{/* biome-ignore lint/security/noDangerouslySetInnerHtml: for 8thwall aframe */}
			{appRendered && <div dangerouslySetInnerHTML={{ __html: sceneHtml }} />}
		</>
	);
}
