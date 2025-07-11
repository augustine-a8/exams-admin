type AvatarProps = {
  name: string;
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n.at(0))
    .join("");
}

export default function Avatar({ name }: AvatarProps) {
  const initials = getInitials(name);

  return (
    <div className="w-14 h-14 border border-yellow-500 rounded-full grid place-items-center bg-yellow-500">
      <p className="font-semibold text-white text-lg">{initials}</p>
    </div>
  );
}
