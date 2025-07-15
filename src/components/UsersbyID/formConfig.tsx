import { Contact } from "lucide-react";
import * as yup from "yup";

export const companySchema = yup.object({
  companyName: yup.string().optional(),
  companyLogo: yup.string().url("Invalid URL").optional(),
  status: yup.string().optional(),
  companySize: yup.string().optional(),
  companyVolume: yup.string().optional(),
  companyType: yup.string().optional(),
  productInfo: yup.string().optional(),
  companyEmail: yup.string().email("Invalid email").optional(),
  companyPhone: yup
    .string()
    .matches(/^[\d\+\-\.\(\)\/\s]*$/, "Invalid phone number")
    .optional(),
  companyWebsite: yup.string().url("Invalid URL").optional(),
  companyAddrerss: yup.object({
    street: yup.string().optional(),
    area: yup.string().optional(),
    city: yup.string().optional(),
    state: yup.string().optional(),
    country: yup.string().optional(),
    zipCode: yup.string().optional(),
  }).optional(),
  directorName: yup.string().optional(),
  directorEmail: yup.string().email("Invalid email").optional(),
  directorPhone: yup
    .string()
    .matches(/^[\d\+\-\.\(\)\/\s]*$/, "Invalid phone number")
    .optional(),
  password: yup.string().min(6, "Password must be at least 6 characters").optional(),
  companyProof: yup.string().optional(),
  taxRegistration: yup.string().optional(),
  certOfIncorporation: yup.string().optional(),
  directorProof: yup.string().optional(),
});

// export const companySchema = yup.object({
//     companyName: yup.string().notNullable().required(),
//     companyLogo: yup.string().url().notNullable().required(),
//     status: yup.string().notNullable().required(),
//     companySize: yup.string().notNullable().required(),
//     companyVolume: yup.string().notNullable().required(),
//     companyType: yup.string().notNullable().required(),
//     productInfo: yup.string().notNullable().required(),
//     companyEmail: yup.string().email().notNullable().required(),
//     companyPhone: yup.string().notNullable().required(),
//     companyWebsite: yup.string().url().notNullable().required(),
//     street: yup.string().notNullable().required(),
//     area: yup.string().notNullable().required(),
//     city: yup.string().notNullable().required(),
//     state: yup.string().notNullable().required(),
//     country: yup.string().notNullable().required(),
//     zipCode: yup.string().notNullable().required(),
//     directorName: yup.string().notNullable().required(),
//     directorEmail: yup.string().email().notNullable().required(),
//     directorPhone: yup.string().notNullable().required(),
//     password: yup.string().min(6).notNullable().required(),
//     companyProof: yup.string().notNullable().required(),
//     taxRegistration: yup.string().notNullable().required(),
//     certOfIncorporation: yup.string().notNullable().required(),
//     directorProof: yup.string().notNullable().required(),
// });
// export const overview = yup.object({
//     companyName: yup.string().notNullable().required(),
//     companyLogo: yup.string().url().notNullable().required(),
//     status: yup.string().notNullable().required(),
//     companySize: yup.string().notNullable().required(),
//     companyVolume: yup.string().notNullable().required(),
//     companyType: yup.string().notNullable().required(),
//     productInfo: yup.string().notNullable().required(),
// });
// export const contact = yup.object({
//     companyEmail: yup.string().email().notNullable().required(),
//     password: yup.string().min(6).notNullable().required(),
//     companyPhone: yup.string().notNullable().required(),
//     companyWebsite: yup.string().url().notNullable().required(),
//     street: yup.string().notNullable().required(),
//     area: yup.string().notNullable().required(),
//     city: yup.string().notNullable().required(),
//     state: yup.string().notNullable().required(),
//     country: yup.string().notNullable().required(),
//     zipCode: yup.string().notNullable().required(),
// });
// export const director = yup.object({
//     directorName: yup.string().notNullable().required(),
//     directorEmail: yup.string().email().notNullable().required(),
//     directorPhone: yup.string().notNullable().required(),
// });
// export const documents = yup.object({
//     companyProof: yup.string().notNullable().required(),
//     taxRegistration: yup.string().notNullable().required(),
//     certOfIncorporation: yup.string().notNullable().required(),
//     directorProof: yup.string().notNullable().required(),
// });


export const schemas = {
    overview: yup.object({
        companyName: yup.string().trim().nonNullable().required("Company name cannot be empty or whitespace only"),
       companyLogo: yup.string().url("Must be a valid URL").nullable().notRequired(),

status: yup
  .string()
  .oneOf([
    "REGISTRATION_STARTED",
    "BASIC_DETAILS_COMPLETED",
    "DOCUMENT_UPLOAD_PENDING",
    "DOCUMENT_UPLOADED",
    "DOCUMENT_VERIFICATION_PENDING",
    "DOCUMENT_REJECTED",
    "DOCUMENT_RESUBMISSION_PENDING",
    "ACTIVE",
    "SUSPENDED",
    "INACTIVE",
  ], "Invalid status")
  .required("Status is required"),

companySize: yup
  .string()
  .oneOf([
    "1-10",
    "11-50",
    "51-200",
    "201-500",
    "501-1000",
    "1000+",
  ], "Invalid company size")
  .required("Company size is required"),

volumeCount: yup
  .string()
  .oneOf([
    "1-100",
    "101-500",
    "501-1000",
    "1001-5000",
    "5001-10000",
    "10000+",
  ], "Invalid volume count")
  .required("Volume count is required"),

companyType: yup
  .string()
  .oneOf(
    ["startup", "smallBusiness", "enterprise", "nonprofit", "government"],
    "Invalid company type"
  )
  .required("Company type is required"),

productInfo: yup
  .string()
  .trim()
  .min(5, "Product info must be at least 5 characters")
  .required("Product info is required"),

    }),
    contact: yup.object({
        companyEmail: yup.string().trim().email("Invalid email format").nonNullable().required( "Company email cannot be empty or whitespace only"),
        password: yup.string().trim().min(6).nonNullable().required( "Password must be at least 6 characters long"),
        companyPhone: yup.string().trim().matches(/^[\d\+\-\.\(\)\/\s]*$/, "Invalid phone number").nonNullable().required( "Company phone cannot be empty or whitespace only"),
        companyWebsite: yup.string().trim().url().nonNullable().required( "Company website cannot be empty or whitespace only"),
      
    }),
    companyAddress: yup.object({
       street: yup.string().trim().nonNullable().required( "Street cannot be empty or whitespace only"),
        area: yup.string().trim().required( "Area cannot be empty or whitespace only"),
        city: yup.string().trim().nonNullable().required( "City cannot be empty or whitespace only"),
        state: yup.string().trim().nonNullable().required( "State cannot be empty or whitespace only"),
        country: yup.string().trim().nonNullable().required( "Country cannot be empty or whitespace only"),
        zipCode: yup.string().trim().required().min(6, "Zip Code must be at least 5 characters").max(6, "Zip Code must be at most 6 characters"),
    }),
    director: yup.object({
        directorName: yup.string().trim().nonNullable().required( "Director name cannot be empty or whitespace only"),
        directorEmail: yup.string().trim().email("Invalid email format").nonNullable().required( "Director email cannot be empty or whitespace only"),
        directorPhone: yup.string().trim().matches(/^[\d\+\-\.\(\)\/\s]*$/, "Invalid phone number").nonNullable().required( "Director phone cannot be empty or whitespace only"),
    }),
    documents: yup.object({
        companyProof: yup.string().nonNullable().required(),
        taxRegistration: yup.string().nonNullable().required(),
        certOfIncorporation: yup.string().nonNullable().required(),
        directorProof: yup.string().nonNullable().required(),
    })
}


export interface CompanyFormField {
    name: string;
    label: string;
    type: string;
    options?: string[];
    value?: string[];
}

export const companyFormFields: { [key in 'overview' | 'contact' | 'companyAddress' | 'director' | 'documents']: CompanyFormField[];
}={
    overview: [
        { name: "companyName", label: "Company Name", type: "text" },
        {
            name: "status",
            label: "Status",
            type: "select",
            options: [
                "REGISTRATION_STARTED",
                "BASIC_DETAILS_COMPLETED",
                "DOCUMENT_UPLOAD_PENDING",
                "DOCUMENT_UPLOADED",
                "DOCUMENT_VERIFICATION_PENDING",
                "DOCUMENT_REJECTED",
                "DOCUMENT_RESUBMISSION_PENDING",
                "ACTIVE",
                "SUSPENDED",
                "INACTIVE",
            ],
            value: [
                "REGISTRATION_STARTED",
                "BASIC_DETAILS_COMPLETED",
                "DOCUMENT_UPLOAD_PENDING",
                "DOCUMENT_UPLOADED",
                "DOCUMENT_VERIFICATION_PENDING",
                "DOCUMENT_REJECTED",
                "DOCUMENT_RESUBMISSION_PENDING",
                "ACTIVE",
                "SUSPENDED",
                "INACTIVE",
           
            ]
        },
        {
            name: "companySize",
            label: "Company Size",
            type: "select",
            options: [
                "1-10",
                "11-50",
                "51-200",
                "201-500",
                "501-1000",
                "1000+",
            ],
        },
        {
            name: "volumeCount",
            label: "Volume Count",
            type: "select",
            options: [
                "1-100",
                "101-500",
                "501-1000",
                "1001-5000",
                "5001-10000",
                "10000+",
            ],
        },
        {
            name: "companyType",
            label: "Company Type",
            type: "select",
            options: [
                "startup",
                "smallBusiness",
                "enterprise",
                "nonprofit",
                "government",
            ],
        },
       {
        name: "productInfo",
        label: "Product Info",
        type: "textarea",
        },
        {
        name: "companyLogo",
        label: "Company Logo (URL)",
        type: "file",
        },
    ],
    contact: [
        { name: "companyEmail", label: "Company Email", type: "email" },
        { name: "password", label: "Password", type: "password" },
        { name: "companyPhone", label: "Company Phone", type: "text" },
        { name: "companyWebsite", label: "Company Website", type: "url" },
      
    ],
      companyAddress: [
    { name: "street", label: "Street", type: "text" },
    { name: "city", label: "City", type: "text" },
    { name: "state", label: "State", type: "text" },
    { name: "country", label: "Country", type: "text" },
    { name: "zipCode", label: "Zip Code", type: "text" },
    { name: "area", label: "Area", type: "text" },
  ],
    director: [
        { name: "directorName", label: "Director Name", type: "text" },
        { name: "directorEmail", label: "Director Email", type: "email" },
        { name: "directorPhone", label: "Director Phone", type: "text" },
    ],
    documents: [
        { name: "companyProof", label: "Company Proof", type: "file" },
        { name: "taxRegistration", label: "Tax Registration", type: "file" },
        { name: "certOfIncorporation", label: "Certificate of Incorporation", type: "file" },
        { name: "directorProof", label: "Director Proof", type: "file" },
    ],

};