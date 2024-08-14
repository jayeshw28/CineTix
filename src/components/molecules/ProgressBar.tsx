export const ProgressBar = ({value}:{value: number}) => {
    if(value === 0) return null
  return (
    <div className="w-full h-1 bg-gray-200 rounded">
        <div
            style={{ width: `${value}%` }}
            className="h-full bg-blue-500 rounded"
        />
    </div>
  )
}
