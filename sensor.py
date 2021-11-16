import spidev
import time
import struct
import numpy as np

# ICM42688P spidev INIT CONFIG
SPI_MAX_CLOCK_HZ = 24000000
SPI_BUS = 0
SPI_DEVICE = 0
SPI_MODE = 0b00

#Addresses
ACCEL_DATA_X1 = 0x1F
ACCEL_DATA_X0 = 0x20
ACCEL_DATA_Y1 = 0x21
ACCEL_DATA_Y0 = 0x22
ACCEL_DATA_Z1 = 0x23
ACCEL_DATA_Z0 = 0x24
REG_PWR_MGMT0 = 0x4E
REG_PWR_MGMT0_VAL = 0x4E
REG_ACCEL_CONFIG0 = 0x50
#8KHZ +- 2G
REG_ACCEL_CONFIG0_VAL = 0x23
REG_BANK_SEL = 0x76
REG_BANK_ZERO_VAL = 0x00
ACCEL_MODE_LN = 0xE3

# Constants
DUMMY_BYTE = 0xAA
CONSTANT_SCALE = 16384

class ICM42688P:
    def __init__(self):
        self._setup_spi_values()
        self._setup_sensor_values()

    def _setup_spi_values(self):
        self.spi = spidev.SpiDev()
        self.spi.open(SPI_BUS, SPI_DEVICE)
        self.spi.max_speed_hz = SPI_MAX_CLOCK_HZ
        self.spi.mode = SPI_MODE

    def _setup_sensor_values(self):
        self.write_data(REG_BANK_SEL, REG_BANK_ZERO_VAL)
        self.write_data(REG_PWR_MGMT0, REG_PWR_MGMT0_VAL)
        self.write_data(REG_ACCEL_CONFIG0, REG_ACCEL_CONFIG0_VAL)

    def write_data(self, address, value):
        device_address = address & 0x7F
        self.spi.xfer2([address, value])
        time.sleep(0.2)

    def read_data(self, address):
        device_address = address | 0x80

        return self.spi.xfer2([device_address, DUMMY_BYTE])[1]

    def get_x_axis(self):
        x = str(self.get_axis(ACCEL_DATA_X1, ACCEL_DATA_X0))
        # y = str(self.get_axis(ACCEL_DATA_Y1, ACCEL_DATA_Y0))
        # z = str(self.get_axis(ACCEL_DATA_Z1, ACCEL_DATA_Z0))

        return x
    
    def get_axis(self, aadress_upper, aadress_lower):
        value_upper = self.read_data(aadress_upper)
        value_lower = self.read_data(aadress_lower)
        
        value = int.from_bytes(bytes([value_upper, value_lower]), byteorder='big', signed=True)
        value = value / CONSTANT_SCALE
    
        return value
    