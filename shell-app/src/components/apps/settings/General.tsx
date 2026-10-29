import { SettingsRow, SettingsSection } from './SettingsApp'


const GeneralSetting = () => {
    return (
        <div aria-label="general" className="space-y-4">
            <SettingsSection title="General Settings" description="Thiết lập hệ thống cơ bản.">
                <SettingsRow title="Language" description="System language setting">
                    <select className="px-3 py-1.5 border border-zinc-300 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
                        <option>English</option>
                        <option>Vietnamese</option>
                        <option>French</option>
                    </select>
                </SettingsRow>

                <SettingsRow title="Time Zone" description="Set your time zone">
                    <select className="px-3 py-1.5 border border-zinc-300 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
                        <option>UTC+07:00 - Ho Chi Minh</option>
                        <option>UTC+00:00 - London</option>
                        <option>UTC-08:00 - Los Angeles</option>
                    </select>
                </SettingsRow>

                <SettingsRow title="Date Format" description="Choose your preferred date format">
                    <select className="px-3 py-1.5 border border-zinc-300 bg-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
                        <option>DD/MM/YYYY</option>
                        <option>MM/DD/YYYY</option>
                        <option>YYYY-MM-DD</option>
                    </select>
                </SettingsRow>
            </SettingsSection>
        </div>
    )
}

export default GeneralSetting