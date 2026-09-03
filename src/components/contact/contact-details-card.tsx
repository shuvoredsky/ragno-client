import Link from "next/link";

export interface ContactDetailsProps {
  address?: string;
  phone?: string;
  email?: string;
  facebook?: { name: string; url: string };
  instagram?: { name: string; url: string };
}

export function ContactDetailsCard({
  address = "Patuakhali, Bangladesh",
  phone = "+880 1998-778632",
  email = "contact@ragnobd.com",
  facebook = { name: "RAGNOBRAND", url: "https://facebook.com/ragnobrand" },
  instagram = { name: "www_ragnobd_com", url: "https://instagram.com/ragnobd" },
}: ContactDetailsProps) {
  return (
    <div className="rounded-2xl sm:rounded-3xl bg-zinc-950/70 border border-white/10 p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-6">
      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
        Details
      </h3>

      <div className="space-y-4 text-xs sm:text-sm divide-y divide-white/10">
        {/* Address */}
        <div className="space-y-1 pt-3 first:pt-0">
          <span className="text-zinc-500 font-medium block text-xs">Address</span>
          <p className="text-white font-medium">{address}</p>
        </div>

        {/* Telephone */}
        <div className="space-y-1 pt-3">
          <span className="text-zinc-500 font-medium block text-xs">Telephone</span>
          <a
            href={`tel:${phone.replace(/\s+/g, "")}`}
            className="text-white hover:text-orange-400 underline underline-offset-4 font-medium transition-colors inline-block"
          >
            {phone}
          </a>
        </div>

        {/* Email */}
        <div className="space-y-1 pt-3">
          <span className="text-zinc-500 font-medium block text-xs">Email</span>
          <a
            href={`mailto:${email}`}
            className="text-white hover:text-orange-400 underline underline-offset-4 font-medium transition-colors inline-block"
          >
            {email}
          </a>
        </div>

        {/* Facebook */}
        <div className="space-y-1 pt-3">
          <span className="text-zinc-500 font-medium block text-xs">Facebook</span>
          <a
            href={facebook.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-orange-400 underline underline-offset-4 font-medium transition-colors inline-block"
          >
            {facebook.name}
          </a>
        </div>

        {/* Instagram */}
        <div className="space-y-1 pt-3">
          <span className="text-zinc-500 font-medium block text-xs">Instagram</span>
          <a
            href={instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-orange-400 underline underline-offset-4 font-medium transition-colors inline-block"
          >
            {instagram.name}
          </a>
        </div>
      </div>
    </div>
  );
}
