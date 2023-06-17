export const GENDERS = {
  male: 'Masculino',
  female: 'Feminino',
} as const;

export type GenderType = keyof typeof GENDERS | '';

export const getGender = (type?: GenderType) => {
  if (!type) return 'Não definido' as const;

  return GENDERS[type];
};
