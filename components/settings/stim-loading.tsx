import { useStimLoading } from '@/components/settings/use-settings'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

export function StimLoadingSetting() {
  const [stimLoading, setStimLoading] = useStimLoading()
  return (
    <div
      className="flex items-center justify-between cursor-pointer hover:bg-accent/50 rounded p-2 -m-2"
      onClick={() => setStimLoading(!stimLoading)}
    >
      <div className="space-y-1 flex-1 pointer-events-none">
        <Label className="text-sm text-foreground" htmlFor="stim-loading">
          Stim Loading
        </Label>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Shows Subway Surfers video while the assistant is working.
        </p>
      </div>
      <Checkbox
        id="stim-loading"
        className="ml-3 pointer-events-none"
        checked={stimLoading}
        onCheckedChange={(checked) =>
          setStimLoading(checked === 'indeterminate' ? false : checked)
        }
      />
    </div>
  )
}