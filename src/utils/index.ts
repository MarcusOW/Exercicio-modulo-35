import { FormikProps } from 'formik'

export const checkInputHasError = <T>(
  formik: FormikProps<T>,
  fieldName: keyof T
): boolean => {
  return !!(formik.touched[fieldName] && formik.errors[fieldName])
}
