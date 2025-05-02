import React, { Fragment, useEffect, useState } from "react";
import SettingsLayout from "../../layouts/SettingsLayout";
import PlusIcon from "../../components/icons/PlusIcon";
import EditIcon from "./../../components/icons/EditIcon";
import DeleteIcon from "../../components/icons/DeleteIcon";
import InfoIcon from "../../components/icons/InfoIcon";
import {
  addDevice,
  changeDeviceName,
  deleteDevice,
  getMyDevices,
} from "./../../services/deviceService";
import DeviceInfoModal from "../../components/modals/DeviceInfoModal";
import EditNameModal from "../../components/modals/EditNameModal";
import { notif_error } from "../../utils/toast";
import LoadingModal from "./../../components/modals/LoadingModal";
import DeleteDeviceModal from "../../components/modals/DeleteDeviceModal";
import AddDeviceModal from "../../components/modals/AddDeviceModal";

const MyDevicesPage = () => {
  const [pageIsReady, setPageIsReady] = useState(false);
  const [devices, setDevices] = useState([]);
  const [device, setDevice] = useState();
  const [deviceInfoModal, setDeviceInfoModal] = useState(false);
  const [editNameModal, setEditNameModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [addDeviceModal, setAddDeviceModal] = useState(false);
  const [deviceName, setDeviceName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getMyDevices();
        setDevices(data.data.devices);
        setPageIsReady(true);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const changeName = async () => {
    try {
      setLoading(true);
      if (deviceName === "") {
        notif_error("وارد کردن نام اجباری می باشد!");
        return;
      }
      const { data } = await changeDeviceName({
        deviceId: device.deviceId,
        name: deviceName,
      });
      if (data.data.status == 2) {
        notif_error("نام دستگاه نمیتواند تکراری باشد.");
        return;
      }
      setDevices((d) => {
        d.find((x) => x.deviceId === device.deviceId).name = deviceName;
        return d;
      });
      setEditNameModal(false);
    } catch (err) {
      console.log(err);
      notif_error("مشکلی پیش آمده است!");
    } finally {
      setLoading(false);
    }
  };

  const submitDeleteDevice = async () => {
    try {
      setLoading(true);
      await deleteDevice(device.deviceId);
      setDevices((d) => {
        const index = d.findIndex((x) => x.deviceId === device.deviceId);
        delete d[index];
        return d;
      });
      setDeleteModal(false);
    } catch (err) {
      console.log(err);
      notif_error("مشکلی پیش آمده است!");
    } finally {
      setLoading(false);
    }
  };

  const submitAddDevice = async (count) => {
    // console.log(count);
    try {
      setLoading(true);
      count = parseInt(count);
      if (!count || isNaN(count)) {
        notif_error("لطفا تعداد دستگاه را وارد کنید.");
        return;
      }
      const { data } = await addDevice(count);
      setDevices((d) =>
        [...data.data.devices, ...d].sort(
          (a, b) => new Date(a.createDate) - new Date(b.createDate)
        )
      );
      setAddDeviceModal(false);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (!pageIsReady) return null;
  return (
    <SettingsLayout
      title={"دستگاه های من"}
      icon={<PlusIcon />}
      onIconClick={() => setAddDeviceModal(true)}
    >
      <LoadingModal isOpen={loading} />
      <DeviceInfoModal
        isOpen={deviceInfoModal}
        onClose={() => setDeviceInfoModal(false)}
        deviceId={device?.deviceId}
      />
      <EditNameModal
        isOpen={editNameModal}
        onClose={() => setEditNameModal(false)}
        name={deviceName}
        onChange={(e) => setDeviceName(e.target.value)}
        onSubmit={changeName}
      />
      <DeleteDeviceModal
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        onSubmit={submitDeleteDevice}
      />
      <AddDeviceModal
        isOpen={addDeviceModal}
        onClose={() => setAddDeviceModal(false)}
        onSubmit={submitAddDevice}
      />
      <div className="my-devices">
        {devices.map((item, index) => (
          <Fragment key={item.deviceId}>
            <div className="my-device">
              <p className="my-device-name">{item.name}</p>
              <div className="operations">
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setDevice(item);
                    setDeviceInfoModal(true);
                  }}
                  data-sound-click
                >
                  <InfoIcon />
                </div>
                <div
                  style={{ cursor: "pointer", marginRight: 8 }}
                  onClick={() => {
                    setDevice(item);
                    setDeviceName(item.name);
                    setEditNameModal(true);
                  }}
                  data-sound-click
                >
                  <EditIcon />
                </div>
                <div
                  style={{ cursor: "pointer", marginRight: 8 }}
                  onClick={() => {
                    setDevice(item);
                    setDeleteModal(true);
                  }}
                  data-sound-click
                >
                  <DeleteIcon />
                </div>
              </div>
            </div>
            {index + 1 !== devices.length && <div className="separator"></div>}
          </Fragment>
        ))}
      </div>
    </SettingsLayout>
  );
};

export default MyDevicesPage;
