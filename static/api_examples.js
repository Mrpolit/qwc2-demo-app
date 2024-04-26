
const componentDidMount = () => {
    const filter = {...searchParams.cfgParams.expression};
    const values = {TEXT: text};
    const params = {
        MAP: searchParams.theme.map,
        SERVICE: 'WMS',
        id: searchParams.theme.id,
        VERSION: searchParams.theme.version,
        REQUEST: 'GetFeatureInfo',
        CRS: searchParams.theme.mapCrs,
        LAYERS: searchParams.theme.layer,
        QUERY_LAYERS: searchParams.theme.layer,
        height: '101',
        width: '101',
        SRS: searchParams.theme.mapCrs,
        WITH_MAPTIP: false,
        WITH_GEOMETRY: true,
        feature_count: searchParams.cfgParams.featureCount || 100,
        info_format: 'text/xml'
    };
    Object.keys(filter).forEach(layer => {
        Object.entries(values).forEach(([key, value]) => {
            filter[layer] = filter[layer].replace(`$${key}$`, value.replace("'", "\\'"));
        });
        params.LAYERS.push(layer);
        params.FILTER.push(layer + ":" + filter[layer]);
    });
    params.QUERY_LAYERS = params.LAYERS = params.LAYERS.join(",");
    params.FILTER = params.FILTER.join(";");
    axios.get(searchParams.theme.featureInfoUrl, {params}).then(response => {
        callback(QgisSearch.searchResults(
            IdentifyUtils.parseResponse(response.data, searchParams.theme, 'text/xml', null, searchParams.mapcrs),
            searchParams.cfgParams.title, searchParams.cfgParams.resultTitle
        ));
    }).catch(() => {
        callback({results: []});
    });
}