// /* eslint-disable jsx-a11y/alt-text */
// import { Page, Text, View, Document, Image } from "@react-pdf/renderer";
// import React from "react";
// import { stylesCoursePDF } from "./stylesCoursePDF";

// import { CourseCertificateDocumentProps } from "@/lib/reportDocumentDefinitions";
// import QRCode from "qrcode";
// import { v5 as uuidv5 } from "uuid";
// const NAMESPACE = "2b9e55dd-9398-44d9-9646-2b4ecf96144c";
// const generateUUID = (code: string): string => {
//   return uuidv5(code, NAMESPACE);
// };
// const generateQRBase64 = async (value: string): Promise<string> => {
//   try {
//     const base64Data = await QRCode.toDataURL(value);
//     return base64Data;
//   } catch (error) {
//     console.error("Error generando el código QR:", error);
//     return "";
//   }
// };
// console.log(generateQRBase64);

// const formatDayAndMounth = (fecha: Date) => {
//   return fecha.toLocaleDateString("es-ES", {
//     day: "numeric",
//     month: "long",
//   });
// };
// const formatYear = (fecha: Date) => {
//   return fecha.toLocaleDateString("es-ES", {
//     year: "numeric",
//   });
// };

// const CourseDocument: React.FC<CourseCertificateDocumentProps> = ({
//   participant,
//   moduleData,
//   images,
// }) => {
//   console.log("first");
//   console.log(participant);
//   console.log(moduleData);
//   console.log(images);

//   const imageCourse = images?.files?.[0]
//     ? ${process.env.NEXT_PUBLIC_API_BASE_URL}${images.files[0]}
//     : null;

//   console.log(imageCourse);

//   const uuidCodeCertificate = generateUUID(participant?.code ?? "981739112");
//   const generateQR = async () => {
//     const qrCodeData = await generateQRBase64(
//       https://vericerts.com/graduate/${uuidCodeCertificate}
//     );
//     return qrCodeData;
//   };

//   const dataqr = generateQR();
//   const br = \n;

//   const descriptionCorp = "ECOMAS Consultoria y Capacitacion";
//   const descriptionFun = "FUNDENORP";
//   const descriptionEnt = "Universidad Nacional de Piura";
//   return (
//     <Document>
//       <Page size="A4" style={stylesCoursePDF.page} orientation="landscape">
//         {/* fondo */}
//         <View style={stylesCoursePDF.backgroundImage} fixed>
//           <Image
//             src={imageCourse || ""}
//             style={{ width: "100%", height: "100%" }}
//           />
//         </View>
//         <View style={stylesCoursePDF.qrCode}>
//           {dataqr && <Image src={dataqr} style={stylesCoursePDF.imageQR} />}
//         </View>
//         {/* content */}
//         <View style={stylesCoursePDF.contentCourse}>
//           <Text style={stylesCoursePDF.name}>{participant?.fullName}</Text>
//           <Text style={stylesCoursePDF.text_center}>
//             por su participacion en el curso: {br}
//             <Text style={stylesCoursePDF.nameCourse}>{moduleData?.name}</Text>
//             {br} en calidad de.{" "}
//             <Text style={stylesCoursePDF.bold}>ASISTENTE</Text>
//           </Text>
//           <Text style={stylesCoursePDF.parrafo}>
//             Curso taller organizado por la{" "}
//             <Text style={stylesCoursePDF.bold}>{descriptionEnt}</Text>,{br}
//             <Text style={stylesCoursePDF.bold}>{descriptionFun}</Text> y{" "}
//             <Text style={stylesCoursePDF.bold}>{descriptionCorp}</Text>, llevado
//             a {br}cabo desde el{" "}
//             {formatDayAndMounth(new Date(moduleData?.startAd ?? ""))} al{" "}
//             {formatDayAndMounth(new Date(moduleData?.endAd ?? ""))} del{" "}
//             {formatYear(new Date(moduleData?.endAd ?? ""))} con {br} una
//             duración de {moduleData?.hours || 20} horas académicas.
//           </Text>
//         </View>
//         {/* ponente */}
//         <View style={stylesCoursePDF.contentPonente}>
//           <Text style={stylesCoursePDF.titlePonent}>PONENTE:</Text>
//           <Text style={stylesCoursePDF.namePonente}>
//             {moduleData?.session[0].session.speaker?.fullName ||
//               "Ponente no especificado"}
//           </Text>
//           <Text style={stylesCoursePDF.titleTemario}>TEMARIO:</Text>
//         </View>
//         {/* temario */}
//         <View style={stylesCoursePDF.contentTemario}>
//           {moduleData?.topics.map((topic, topicIndex) => (
//             <Text style={stylesCoursePDF.listTemario} key={topicIndex}>
//               - {topic.tema}
//             </Text>
//           ))}
//         </View>
//         s{/* code registro */}
//         <View style={stylesCoursePDF.contentCode}>
//           <Text style={stylesCoursePDF.codeRegister}>{participant?.code}</Text>
//           <Text style={stylesCoursePDF.codeRegister}></Text>
//         </View>
//       </Page>
//     </Document>
//   );
// };

// export default CourseDocument;
// /* eslint-disable jsx-a11y/alt-text */
// import { Page, Text, View, Document, Image } from "@react-pdf/renderer";
// import React from "react";
// import { stylesCoursePDF } from "./stylesCoursePDF";

// import { CourseCertificateDocumentProps } from "@/lib/reportDocumentDefinitions";
// import QRCode from "qrcode";
// import { v5 as uuidv5 } from "uuid";
// const NAMESPACE = "2b9e55dd-9398-44d9-9646-2b4ecf96144c";
// const generateUUID = (code: string): string => {
//   return uuidv5(code, NAMESPACE);
// };
// const generateQRBase64 = async (value: string): Promise<string> => {
//   try {
//     const base64Data = await QRCode.toDataURL(value);
//     return base64Data;
//   } catch (error) {
//     console.error("Error generando el código QR:", error);
//     return "";
//   }
// };
// console.log(generateQRBase64);

// const formatDayAndMounth = (fecha: Date) => {
//   return fecha.toLocaleDateString("es-ES", {
//     day: "numeric",
//     month: "long",
//   });
// };
// const formatYear = (fecha: Date) => {
//   return fecha.toLocaleDateString("es-ES", {
//     year: "numeric",
//   });
// };

// const CourseDocument: React.FC<CourseCertificateDocumentProps> = ({
//   participant,
//   moduleData,
//   images,
// }) => {
//   console.log("first");
//   console.log(participant);
//   console.log(moduleData);
//   console.log(images);

//   const imageCourse = images?.files?.[0]
//     ? ${process.env.NEXT_PUBLIC_API_BASE_URL}${images.files[0]}
//     : null;

//   console.log(imageCourse);

//   const uuidCodeCertificate = generateUUID(participant?.code ?? "981739112");
//   const generateQR = async () => {
//     const qrCodeData = await generateQRBase64(
//       https://vericerts.com/graduate/${uuidCodeCertificate}
//     );
//     return qrCodeData;
//   };

//   const dataqr = generateQR();
//   const br = \n;

//   const descriptionCorp = "ECOMAS Consultoria y Capacitacion";
//   const descriptionFun = "FUNDENORP";
//   const descriptionEnt = "Universidad Nacional de Piura";
//   return (
//     <Document>
//       <Page size="A4" style={stylesCoursePDF.page} orientation="landscape">
//         {/* fondo */}
//         <View style={stylesCoursePDF.backgroundImage} fixed>
//           <Image
//             src={imageCourse || ""}
//             style={{ width: "100%", height: "100%" }}
//           />
//         </View>
//         <View style={stylesCoursePDF.qrCode}>
//           {dataqr && <Image src={dataqr} style={stylesCoursePDF.imageQR} />}
//         </View>
//         {/* content */}
//         <View style={stylesCoursePDF.contentCourse}>
//           <Text style={stylesCoursePDF.name}>{participant?.fullName}</Text>
//           <Text style={stylesCoursePDF.text_center}>
//             por su participacion en el curso: {br}
//             <Text style={stylesCoursePDF.nameCourse}>{moduleData?.name}</Text>
//             {br} en calidad de.{" "}
//             <Text style={stylesCoursePDF.bold}>ASISTENTE</Text>
//           </Text>
//           <Text style={stylesCoursePDF.parrafo}>
//             Curso taller organizado por la{" "}
//             <Text style={stylesCoursePDF.bold}>{descriptionEnt}</Text>,{br}
//             <Text style={stylesCoursePDF.bold}>{descriptionFun}</Text> y{" "}
//             <Text style={stylesCoursePDF.bold}>{descriptionCorp}</Text>, llevado
//             a {br}cabo desde el{" "}
//             {formatDayAndMounth(new Date(moduleData?.startAd ?? ""))} al{" "}
//             {formatDayAndMounth(new Date(moduleData?.endAd ?? ""))} del{" "}
//             {formatYear(new Date(moduleData?.endAd ?? ""))} con {br} una
//             duración de {moduleData?.hours || 20} horas académicas.
//           </Text>
//         </View>
//         {/* ponente */}
//         <View style={stylesCoursePDF.contentPonente}>
//           <Text style={stylesCoursePDF.titlePonent}>PONENTE:</Text>
//           <Text style={stylesCoursePDF.namePonente}>
//             {moduleData?.session[0].session.speaker?.fullName ||
//               "Ponente no especificado"}
//           </Text>
//           <Text style={stylesCoursePDF.titleTemario}>TEMARIO:</Text>
//         </View>
//         {/* temario */}
//         <View style={stylesCoursePDF.contentTemario}>
//           {moduleData?.topics.map((topic, topicIndex) => (
//             <Text style={stylesCoursePDF.listTemario} key={topicIndex}>
//               - {topic.tema}
//             </Text>
//           ))}
//         </View>
//         s{/* code registro */}
//         <View style={stylesCoursePDF.contentCode}>
//           <Text style={stylesCoursePDF.codeRegister}>{participant?.code}</Text>
//           <Text style={stylesCoursePDF.codeRegister}></Text>
//         </View>
//       </Page>
//     </Document>
//   );
// };

// export default CourseDocument;