export const SERVICES = [
  { value: "wedding", label: "Wedding" },
  { value: "pre_wedding", label: "Pre-wedding" },
  { value: "post_wedding", label: "Post-wedding" },
  { value: "engagement", label: "Engagement" },
  { value: "birthday", label: "Birthday" },
  { value: "maternity", label: "Maternity" },
  { value: "other", label: "Other events" },
];

export const serviceLabel = (value) =>
  SERVICES.find((s) => s.value === value)?.label ?? value;