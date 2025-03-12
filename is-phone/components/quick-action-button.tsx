interface QuickActionButtonProps {
  icon: string
  label: string
  onClick?: () => void
}

export function QuickActionButton({ icon, label, onClick }: QuickActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center w-16 h-16 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
    >
      <span className="text-2xl">{icon}</span>
      <span className="text-xs mt-1 text-muted-foreground">{label}</span>
    </button>
  )
}

