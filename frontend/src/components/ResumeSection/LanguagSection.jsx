import React from 'react'
import Progress from '../Progress'

const LanguageInfo = ({ language, progress, accentColor, bgColor })=> {
    return (
        <div className='flex items-center justify-between'>
            <p className={`text-[12px] font-semibold text-gray-900`}>{language}</p>
            {progress > 0 && (
                <Progress
                    progress={(progress / 100) * 5}
                    color={accentColor}
                    bgColor={bgColor}
                />
            )}
        </div>
    )
}
const LanguagSection = ({ languages = [], accentColor, bgColor }) => {
    return (
        <div className='flex flex-col gap-2'>
            {languages.map((lang, idx) => (
                <LanguageInfo
                    key={`slanguage_${idx}`}
                    language={lang.name}
                    progress={lang.progress}
                    accentColor={accentColor}
                    bgColor={bgColor}
                />
            ))}
        </div>
    )
}

export default LanguagSection
