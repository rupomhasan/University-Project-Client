
export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
]

export const bloodGroup = ["A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-"]

const gender = ["male", "female", "other"]



export const genderOptions = gender.map((item) => ({
  label: item,
  value: item
}))

export const bloodGroupOptions = bloodGroup.map((item) => ({
  label: item,
  value: item
}))

export const monthOptions = monthNames.map((item) => ({
  label: item,
  value: item
}))