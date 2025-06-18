import React, { Fragment, useEffect, useRef, useState } from "react";
import SettingsLayout from "../../layouts/SettingsLayout";
import PlusIcon from "../../components/icons/PlusIcon";
import EditIcon from "./../../components/icons/EditIcon";
import DeleteIcon from "../../components/icons/DeleteIcon";
import InfoIcon from "../../components/icons/InfoIcon";
import {
  addDevice,
  changeDeviceName,
  changeDevicesFeatures,
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
import EmptyDevicesIcon from "./../../components/icons/EmptyDevicesIcon";
import CustomButton from "../../components/shared/CustomButton";
import CustomSwitch from "./../../components/shared/CustomSwitch";
import ArrowDownIcon from "../../components/icons/ArrowDownIcon";

const MyDevicesPage = () => {
  const [pageIsReady, setPageIsReady] = useState(false);
  const [devices, setDevices] = useState([]);
  const [device, setDevice] = useState();
  const [deviceInfoModal, setDeviceInfoModal] = useState(false);
  const [editNameModal, setEditNameModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [addDeviceModal, setAddDeviceModal] = useState(false);
  const [deviceName, setDeviceName] = useState("");
  const [deletesModal, setDeletesModal] = useState(false);
  const [toggleSelectDevices, setToggleSelectDevices] = useState(false);
  const [summer, setSummer] = useState(false);
  const [refreshRateToggle, setRefreshRateToggle] = useState(false);
  const [refreshRateType, setRefreshRateType] = useState(5);
  const [wifi, setWifi] = useState(true);
  const [loading, setLoading] = useState(false);

  const refreshRateSelectButton = useRef();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getMyDevices();
        setDevices(
          data.data.devices.map((d) => {
            return { ...d, selected: false };
          })
        );
        setSummer(data.data.devices[0].summer);
        setRefreshRateType(data.data.devices[0].refreshRateType);
        setWifi(data.data.devices[0].wifi);
        setPageIsReady(true);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  useEffect(() => {
    if (!pageIsReady) return;
    (async () => {
      try {
        setLoading(true);
        await changeDevicesFeatures({ summer, refreshRateType, wifi });
      } catch (err) {
        console.log(err);
        notif_error("مشکلی پیش آمده است.");
      } finally {
        setLoading(false);
      }
    })();
  }, [refreshRateType, summer, wifi]);

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
      setDeletesModal(false);
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

  const getRefreshRateType = (type) => {
    switch (type) {
      case 1:
        return "۰۱ دقیقه";
      case 2:
        return "۰۳ دقیقه";
      case 3:
        return "۰۵ دقیقه";
      case 4:
        return "۱۵ دقیقه";
      case 5:
        return "۳۰ دقیقه";
      case 6:
        return "۰۱ ساعت";
      case 7:
        return "۰۲ ساعت";
      case 8:
        return "۰۶ ساعت";
      case 9:
        return "۱۲ ساعت";
      case 10:
        return "۲۴ ساعت";
    }
  };

  if (!pageIsReady) return null;
  return (
    <SettingsLayout
      title={"مدیریت دستگاه ها"}
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
        single={true}
      />
      <DeleteDeviceModal
        isOpen={deletesModal}
        onClose={() => setDeletesModal(false)}
        onSubmit={submitDeleteDevices}
        single={false}
      />
      <AddDeviceModal
        isOpen={addDeviceModal}
        onClose={() => setAddDeviceModal(false)}
        onSubmit={submitAddDevice}
      />

      {devices.length ? (
        <>
          <div className="my-devices-features-title">
            <span>تنظیمات دستگاه ها</span>
          </div>
          <div className="my-devices-features">
            <div className="refresh-rate-feature">
              <div className="refresh-rate-label">نرخ داده برداری</div>
              <div
                ref={refreshRateSelectButton}
                className="refresh-rate-select"
                data-sound-click
                onClick={() => setRefreshRateToggle((t) => !t)}
              >
                <div className="refresh-rate-select-button">
                  <span>{getRefreshRateType(refreshRateType)}</span>
                  <ArrowDownIcon />
                </div>
                {refreshRateToggle && (
                  <div className="options-container">
                    <div className="options">
                      <div
                        onClick={() => setRefreshRateType(1)}
                        data-sound-click
                      >
                        {getRefreshRateType(1)}
                      </div>
                      <div
                        onClick={() => setRefreshRateType(2)}
                        data-sound-click
                      >
                        {getRefreshRateType(2)}
                      </div>
                      <div
                        onClick={() => setRefreshRateType(3)}
                        data-sound-click
                      >
                        {getRefreshRateType(3)}
                      </div>
                      <div
                        onClick={() => setRefreshRateType(4)}
                        data-sound-click
                      >
                        {getRefreshRateType(4)}
                      </div>
                      <div
                        onClick={() => setRefreshRateType(5)}
                        data-sound-click
                      >
                        {getRefreshRateType(5)}
                      </div>
                      <div
                        onClick={() => setRefreshRateType(6)}
                        data-sound-click
                      >
                        {getRefreshRateType(6)}
                      </div>
                      <div
                        onClick={() => setRefreshRateType(7)}
                        data-sound-click
                      >
                        {getRefreshRateType(7)}
                      </div>
                      <div
                        onClick={() => setRefreshRateType(8)}
                        data-sound-click
                      >
                        {getRefreshRateType(8)}
                      </div>
                      <div
                        onClick={() => setRefreshRateType(9)}
                        data-sound-click
                      >
                        {getRefreshRateType(9)}
                      </div>
                      <div
                        onClick={() => setRefreshRateType(10)}
                        data-sound-click
                      >
                        {getRefreshRateType(10)}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div>
              <div className="summer-feature">
                <CustomSwitch
                  onChange={() => setSummer((w) => !w)}
                  checked={summer}
                />
                <div style={{ marginRight: 8, color: summer ? "#36EDF7" : "" }}>
                  تابستانه
                </div>
              </div>
              <div className="wifi-feature">
                <CustomSwitch
                  onChange={() => setWifi((w) => !w)}
                  checked={wifi}
                />
                <div style={{ marginRight: 8, color: summer ? "#36EDF7" : "" }}>
                  وای فای
                </div>
              </div>
            </div>
          </div>
          <hr style={{ borderColor: "#17b9ff1a", borderWidth: 3 }} />
          <div>
            <div className="select-all-my-devices-container">
              <button
                type="button"
                className={
                  toggleSelectDevices
                    ? "btn-select-devices active"
                    : "btn-select-devices"
                }
                onClick={() => setToggleSelectDevices((x) => !x)}
              >
                انتخاب گروهی
              </button>
              {toggleSelectDevices ? (
                <CustomCheckbox
                  checked={
                    devices.length === devices.filter((d) => d.selected).length
                  }
                  onChange={() => {
                    if (
                      devices.length ===
                      devices.filter((d) => d.selected).length
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
                  style={{ marginRight: 8 }}
                />
              ) : null}
              {devices.filter((d) => d.selected).length ? (
                <div
                  style={{
                    cursor: "pointer",
                    marginLeft: 16,
                    marginRight: "auto",
                  }}
                  onClick={() => setDeletesModal(true)}
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
                    {toggleSelectDevices ? (
                      <div className="my-device-checkbox">
                        <CustomCheckbox
                          checked={item.selected}
                          onChange={() => toggleSelectDevice(item.deviceId)}
                        />
                      </div>
                    ) : null}
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
        </>
      ) : (
        <div className="my-devices-empty">
          <EmptyDevicesIcon width={250} height={250} />
          <p>شما در حال حاضر دستگاهی ندارید.</p>
          <CustomButton
            text={"افزودن دستگاه"}
            onClick={() => setAddDeviceModal(true)}
          />
        </div>
      )}
    </SettingsLayout>
  );
};

export default MyDevicesPage;
