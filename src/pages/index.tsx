import {
  Link as ChakraLink,
  Badge,
  Text,
  Heading,
  Wrap,
  Stack,
  Select,
  Input,
  useDisclosure,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Flex,
  Link,
  SimpleGrid,
} from "@chakra-ui/react";
import { Container } from "../components/Container";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { getRumahSakit } from "../data/getRumahSakit";
import React from "react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

export async function getStaticProps({ params }) {
  const rumahSakit = await getRumahSakit();
  return {
    props: {
      rumahSakit,
    },
    revalidate: 60,
  };
}

const VaxLocationDetail = (location) => {};

const VaxLocation = (location) => {
  const {
    kode_faskes,
    faskes,
    wilayah,
    nomor_hotline_spgdt,
    updated_time,
    kosong_isolasi_negatif,
    kosong_isolasi_tanpa_negatif,
    kosong_icu_negatif_ventilator,
    kosong_icu_negatif_tanpa_ventilator,
    kosong_icu_tanpa_negatif_ventilator,
    kosong_icu_tanpa_negatif_tanpa_ventilator,
    kapasitas_isolasi_negatif,
    kapasitas_isolasi_tanpa_negatif,
    kapasitas_icu_negatif_ventilator,
    kapasitas_icu_negatif_tanpa_ventilator,
    kapasitas_icu_tanpa_negatif_ventilator,
    kapasitas_icu_tanpa_negatif_tanpa_ventilator,
  } = location;

  return (
    <Container
      border={"1px solid black"}
      alignItems="start"
      minHeight={["10em"]}
    >
      <Stack padding={1} w="100%">
        <Text>Nama RS: {faskes}</Text>
        <Text>
          Wilayah: {wilayah}
        </Text>
        <Text>Hotline Gawat Darurat: {nomor_hotline_spgdt}</Text>
        <Text>Terakhir diupdate: {updated_time || "tidak tersedia"}</Text>
        <Stack direction="row" wrap="wrap" gridRowGap={2} paddingBlockEnd={2}>
              <Popover key={kode_faskes}>
                <PopoverTrigger>
                  <Button>Isolasi ({parseInt(kosong_isolasi_negatif) + parseInt(kosong_isolasi_tanpa_negatif)})</Button>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverCloseButton />
                  <PopoverBody>
                    <Stack>
                      <Text key={kode_faskes}>Tekanan Negatif: {kosong_isolasi_negatif}</Text>
                      <Text key={kode_faskes}>Tanpa Tekanan Negatif: {kosong_isolasi_tanpa_negatif}</Text>
                    </Stack>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
              <Popover key={kode_faskes}>
                <PopoverTrigger>
                  <Button>ICU Negatif ({parseInt(kosong_icu_negatif_ventilator) + parseInt(kosong_icu_negatif_tanpa_ventilator)})</Button>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverCloseButton />
                  <PopoverBody>
                    <Stack>
                      <Text key={kode_faskes}>Dengan Ventilator: {kosong_icu_negatif_ventilator}</Text>
                      <Text key={kode_faskes}>Tanpa Ventilator: {kosong_icu_negatif_tanpa_ventilator}</Text>
                    </Stack>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
              <Popover key={kode_faskes}>
                <PopoverTrigger>
                  <Button>ICU Tanpa Negatif ({parseInt(kosong_icu_tanpa_negatif_ventilator) + parseInt(kosong_icu_tanpa_negatif_tanpa_ventilator)})</Button>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverCloseButton />
                  <PopoverBody>
                    <Stack>
                      <Text key={kode_faskes}>Dengan Ventilator: {kosong_icu_tanpa_negatif_ventilator}</Text>
                      <Text key={kode_faskes}>Tanpa Ventilator: {kosong_icu_tanpa_negatif_tanpa_ventilator}</Text>
                    </Stack>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
        </Stack>
      </Stack>
    </Container>
  );
};

const Index = ({ rumahSakit }) => {
  const [searchBy, setSearchBy] = React.useState("wilayah");
  const [searchKeyword, setSearchKeyword] = React.useState("");

  const rumahSakitToRender = ({ rumahSakit, searchBy, searchKeyword }) => {
    if (!searchKeyword.length) {
      return rumahSakit;
    }
    return rumahSakit.filter((props) => {
      return props[searchBy]
        .toLowerCase()
        .includes(searchKeyword.toLowerCase());
    });
  };

  return (
    <Container minHeight="100vh" overflowX="hidden">
      <DarkModeSwitch />
      <Stack paddingInline={[4, 6]} width="100%">
        <Heading paddingBlockStart="8">
          Info Ketersediaan Rumah Sakit DKI Jakarta
        </Heading>

        <Flex direction="row">
          <Select
            flexShrink={0}
            value={searchBy}
            marginRight={1}
            width="auto"
            onChange={(e) => {
              setSearchBy(e.target.value);
            }}
          >
            <option value="wilayah">Wilayah</option>
          </Select>
          <Input
            placeholder="cari wilayah"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          ></Input>
        </Flex>

        <SimpleGrid columns={[1,2,3]} spacing={2}>
          {rumahSakitToRender({ rumahSakit, searchBy, searchKeyword }).map(
            (l, index) => {
              return <VaxLocation key={index} {...l} />;
            }
          )}
        </SimpleGrid>
      </Stack>
    </Container>
  );
};

export default Index;
