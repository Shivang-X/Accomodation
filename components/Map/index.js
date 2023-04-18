import dynamic from 'next/dynamic';

const Map = dynamic(() => import('./Map'), { ssr: false })

const MapCaller = ({ ad, location, width, height}) => {
    // console.log(location)
    return <Map ad={ad} location={location} width={width} height={height}/>
}

export default MapCaller
