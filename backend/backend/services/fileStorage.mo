import D3 "mo:d3storage/D3";

import Constants "../utils/constants";

module Storage {
    public class D3Service(d3 : D3.D3) {
        public func uploadFile({
            fileBlob : Blob;
            fileName : Text;
            fileType : Text;
        }) : async Text {
            let imageId = await D3.storeFile({
                d3;
                storeFileInput = {
                    fileDataObject = fileBlob;
                    fileName;
                    fileType;
                };
            });

            let canisterId = Constants.BackendCanisterId;
            let isLocal = Constants.IsLocal;
            if (isLocal) {
                return "http://127.0.0.1:4943/d3?canisterId=" # canisterId # "&file_id=" # imageId.fileId;
            } else {
                return "https://" # canisterId # ".raw.icp0.io/d3?file_id=" # imageId.fileId;
            };
        };
    };
};
