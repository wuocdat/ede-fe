import { Stack, Typography } from "@mui/material";
import InfoBox from "./subComponents/InfoBox";
import { BarChart, PieChart, pieArcLabelClasses } from "@mui/x-charts";
import LabelBox from "@/components/share/LableBox";
import { grey } from "@mui/material/colors";
import { useQuery } from "@tanstack/react-query";
import TransService from "@/service/trans.services";

const AdminPage = () => {
  const { isPending: isTransStatisticLoading, data: transStatistic } = useQuery({
    queryKey: ["getTransStatistic"],
    queryFn: TransService.getTransStatistic,
  });

  const { isPending: isMonthlyEditorLoading, data: monthlyEditorStatistic } = useQuery({
    queryKey: ["monthlyEditorStatistic"],
    queryFn: TransService.getMonthlyEditorStatistic,
  });

  const { isPending: isAllTimeEditorLoading, data: allTimeEditorStatistic } = useQuery({
    queryKey: ["allTimeEditorStatistic"],
    queryFn: TransService.getAllTimeEditorStatistic,
  });

  return (
    <Stack p={2} bgcolor={grey[100]}>
      <Typography variant="h5" fontWeight="500" textTransform="uppercase" mt={1}>
        Thống kê toàn thời gian
      </Typography>
      <Stack direction="row" spacing={2} mt={1}>
        <LabelBox isLoading={isTransStatisticLoading} title="Các thông số" maxWidth={500}>
          {!!transStatistic && (
            <Stack direction="row" gap={3} mt={1} flexWrap="wrap" alignContent="flex-start">
              <InfoBox title="Tổng" text={transStatistic.allTransNum + ""} />
              <InfoBox title="đã chuẩn hóa" text={transStatistic.correctTransNum} />
              <InfoBox title="chưa chuẩn hóa" text={transStatistic.incorrectTransNum} />
            </Stack>
          )}
        </LabelBox>
        <LabelBox isLoading={isMonthlyEditorLoading} title="Thông số tháng này" maxWidth={600}>
          {!!monthlyEditorStatistic && (
            <Stack direction="row" gap={3} mt={1} flexWrap="wrap">
              <InfoBox title="số câu được chẩn hóa" text={monthlyEditorStatistic.total + ""} />
              {monthlyEditorStatistic.editors.map((editor) => (
                <InfoBox
                  key={editor.editor.id}
                  title={editor.editor.username}
                  text={editor.editedSentenceCount}
                />
              ))}
            </Stack>
          )}
        </LabelBox>
        <LabelBox title="Trong tháng này" alignSelf="stretch" flex={1}>
          <PieChart
            series={[
              {
                data: monthlyEditorStatistic
                  ? monthlyEditorStatistic.editors.map((editor) => ({
                      id: editor.editor.id,
                      value: editor.editedSentenceCount,
                      label: editor.editor.username,
                    }))
                  : [],
                arcLabel: (item) => `${item.label} (${item.value})`,
                arcLabelMinAngle: 45,
              },
            ]}
            height={300}
            sx={{
              [`& .${pieArcLabelClasses.root}`]: {
                fill: "white",
                fontWeight: "bold",
              },
            }}
          />
        </LabelBox>
      </Stack>
      <Typography variant="h5" fontWeight="500" textTransform="uppercase" mt={5}>
        Thống kê toàn thời gian
      </Typography>
      <Stack direction="row" alignItems="center" spacing={3} mt={1}>
        <LabelBox title="Trong 5 tháng gần nhất" flex={1}>
          <BarChart
            xAxis={[
              { scaleType: "band", data: ["group A", "group B", "group C", "group D", "group E"] },
            ]}
            series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
            height={300}
          />
        </LabelBox>
        <LabelBox title="Kết quả chuẩn hóa" isLoading={isAllTimeEditorLoading}>
          <PieChart
            series={[
              {
                data: allTimeEditorStatistic
                  ? allTimeEditorStatistic.map((editor) => ({
                      id: editor.editor.id,
                      value: editor.editedSentenceCount,
                      label: editor.editor.username,
                    }))
                  : [],
                arcLabel: (item) => `${item.label} (${item.value})`,
                arcLabelMinAngle: 45,
              },
            ]}
            width={500}
            height={300}
            sx={{
              [`& .${pieArcLabelClasses.root}`]: {
                fill: "white",
                fontWeight: "bold",
              },
            }}
          />
        </LabelBox>
      </Stack>
    </Stack>
  );
};

export default AdminPage;
