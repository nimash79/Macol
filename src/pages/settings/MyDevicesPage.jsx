import React, { Fragment, useEffect, useState } from "react";
import SettingsLayout from "../../layouts/SettingsLayout";
import PlusIcon from "../../components/icons/PlusIcon";
import EditIcon from "./../../components/icons/EditIcon";
import DeleteIcon from "../../components/icons/DeleteIcon";
import InfoIcon from "../../components/icons/InfoIcon";
import {
  addDevice,
  changeDeviceName,
  deleteDevices,
  getMyDevices,
} from "./../../services/deviceService";
import DeviceInfoModal from "../../components/modals/DeviceInfoModal";
import EditNameModal from "../../components/modals/EditNameModal";
import { notif_error } from "../../utils/toast";
import LoadingModal from "./../../components/modals/LoadingModal";
import DeleteDeviceModal from "../../components/modals/DeleteDeviceModal";
import AddDeviceModal from "../../components/modals/AddDeviceModal";
import CustomCheckbox from "../../components/shared/CustomCheckbox";
import EmptyDevicesIcon from './../../components/icons/EmptyDevicesIcon';
import CustomButton from "../../components/shared/CustomButton";

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
        setDevices(
          data.data.devices.map((d) => {
            return { ...d, selected: false };
          })
        );
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
      await deleteDevices([device.deviceId]);
      setDevices((d) => d.filter((x) => x.deviceId !== device.deviceId));
      setDeleteModal(false);
    } catch (err) {
      console.log(err);
      notif_error("مشکلی پیش آمده است!");
    } finally {
      setLoading(false);
    }
  };

  const submitDeleteDevices = async () => {
    try {
      setLoading(true);
      const deviceIds = devices
        .filter((d) => d.selected)
        .map((d) => d.deviceId);
      await deleteDevices(deviceIds);
      setDevices((d) =>
        d
          .filter((x) => !deviceIds.includes(x.deviceId))
          .map((x) => {
            return { ...x, selected: false };
          })
      );
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
      console.log("devices:", devices);
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

  const toggleSelectDevice = (deviceId) => {
    let [...devicesCopy] = devices;
    const deviceIndex = devices.findIndex((d) => d.deviceId === deviceId);
    devicesCopy[deviceIndex].selected = !devicesCopy[deviceIndex].selected;
    setDevices(devicesCopy);
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
      {devices.length ? (
        <div>
          <div className="select-all-my-devices-container">
            <button
              type="button"
              className={
                devices.length === devices.filter((d) => d.selected).length
                  ? "btn-select-devices active"
                  : "btn-select-devices"
              }
              onClick={() => {
                if (
                  devices.length === devices.filter((d) => d.selected).length
                ) {
                  setDevices((ds) =>
                    ds.map((d) => {
                      return { ...d, selected: false };
                    })
                  );
                } else {
                  setDevices((ds) =>
                    ds.map((d) => {
                      return { ...d, selected: true };
                    })
                  );
                }
              }}
            >
              انتخاب همه
            </button>
            {devices.filter((d) => d.selected).length ? (
              <div
                style={{ cursor: "pointer", marginLeft: 16 }}
                onClick={submitDeleteDevices}
                data-sound-click
              >
                <DeleteIcon />
              </div>
            ) : null}
          </div>
          <div className="my-devices">
            {devices.map((item, index) => (
              <Fragment key={item.deviceId}>
                <div className="my-device">
                  <div className="my-device-checkbox">
                    <CustomCheckbox
                      checked={item.selected}
                      onChange={() => toggleSelectDevice(item.deviceId)}
                    />
                  </div>
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
                {index + 1 !== devices.length && (
                  <div className="separator"></div>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      ) : (
        <div className="my-devices-empty">
          <EmptyDevicesIcon width={250} height={250} />
          <p>شما در حال حاضر دستگاهی ندارید.</p>
          <CustomButton text={"افزودن دستگاه"} onClick={() => setAddDeviceModal(true)}  />
        </div>
      )}
    </SettingsLayout>
  );
};

export default MyDevicesPage;
