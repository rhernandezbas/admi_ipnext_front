interface Tab {
  id: string
  label: string
}

interface TabsProps {
  tabs: Tab[]
  activeTab: string
  onChange: (id: string) => void
}

export function Tabs({ tabs, activeTab, onChange }: TabsProps) {
  return (
    <div className="flex border-b border-[#E8E8E8]">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors cursor-pointer -mb-px ${
            activeTab === tab.id
              ? 'border-[#E42313] text-[#E42313]'
              : 'border-transparent text-[#7A7A7A] hover:text-[#0D0D0D]'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
