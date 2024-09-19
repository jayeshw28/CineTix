import { Map } from "../organisms/Map";
import { Panel } from "../organisms/Map/Panel";
import { DefaultZoomControls } from "../organisms/Map/ZoomControls";
import { DisplayCinemas } from "../organisms/SearchUtils";
import { SetCity } from "../organisms/SearchUtils/SetCity";

export const SearchCinemas = () => {
  return (
    <div className="rounded-sm">
      <Map>
        <Panel position="right-center">
          <DefaultZoomControls />
        </Panel>
        <DisplayCinemas />
        <Panel>
          <SetCity />
        </Panel>
      </Map>
    </div>
  );
};
